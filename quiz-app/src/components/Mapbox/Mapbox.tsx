import React, { useState, useRef, useEffect } from 'react';
import mapboxgl, { Map as MapGl, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useQuizContext } from '../Quizcontext';
import './Mapbox.scss';

mapboxgl.accessToken = 'pk.eyJ1IjoibXVxcSIsImEiOiJjbG0zeG0xMW4yNmN2M2VwM2RoYWo2cHZyIn0.lBFE2NVyItO8GoKkJKBYGQ';

function Mapbox() {
  const mapContainer = useRef(null);
  const mapRef = useRef<MapGl | null>(null);
  const [lat, setLat] = useState<number>(57.7);
  const [lng, setLng] = useState<number>(11.89);
  const [zoom, setZoom] = useState<number>(10);

  const { selectedLocation, selectedQuizQuestions } = useQuizContext();

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new MapGl({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    const map: MapGl = mapRef.current;

    map.on('move', () => {
      const position = map.getCenter();
      setLat(Number(position.lat.toFixed(4)));
      setLng(Number(position.lng.toFixed(4)));
      setZoom(map.getZoom());
    });
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!mapRef.current || !selectedLocation || !selectedQuizQuestions) return;

    const correspondingQuestion = selectedQuizQuestions.find(
      q => q.latitude === selectedLocation.latitude && q.longitude === selectedLocation.longitude
    );
    
    if (!correspondingQuestion) return;

    const popup = new Popup({ offset: 25 })
      .setHTML(`
        <strong>Question:</strong> ${correspondingQuestion.question} <br />
        <strong>Answer:</strong> ${correspondingQuestion.answer}
      `);

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([parseFloat(selectedLocation.longitude), parseFloat(selectedLocation.latitude)])
      .setPopup(popup)
      .addTo(mapRef.current);

  }, [selectedLocation, selectedQuizQuestions]);

  return (
    <div ref={mapContainer} className='map-container'></div>
  );
}

export default Mapbox;


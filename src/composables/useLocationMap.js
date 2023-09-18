import { ref } from 'vue';

export default function useLocationMap() {
  const zoom = ref(18)
  const center = ref([13.6875273,-89.2369862])

  function pin(e) {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  }

  return {
    zoom,
    center,
    pin
  } 
}
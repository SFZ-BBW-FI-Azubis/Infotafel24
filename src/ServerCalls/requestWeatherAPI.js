'use server';


export default async function requestWeatherAPI() {
  const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=50.8357&longitude=12.9292&hourly=temperature_2m,rain&timezone=Europe%2FBerlin');
  const data = await response.json();
  return data;
}
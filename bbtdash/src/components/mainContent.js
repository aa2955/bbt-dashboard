import React, { useState, useEffect } from 'react';
import Dropdown from './dropdown';
import Simah from './simah.svg';

const MainContent = () => {
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/regions')
      .then(response => response.json())
      .then(data => {
        console.log('Regions data:', data); // Log fetched data
        setRegions(data.data);
      })
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetch(`http://localhost:3001/countries/${selectedRegion}`)
        .then(response => response.json())
        .then(data => setCountries(data.data))
        .catch(error => console.error('Error fetching countries:', error));
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`http://localhost:3001/communities/${selectedCountry}`)
        .then(response => response.json())
        .then(data => setCommunities(data.data))
        .catch(error => console.error('Error fetching communities:', error));
    }
  }, [selectedCountry]);

  return (
    <section id="home" className="main-content">
      <div className="content-box">
        <h1>Set your Goal for Bhadra '24</h1>
        <h2>Surge to 100k!</h2>
        <p>
          This tool provides a quick overview of your past pledges and scores, enabling
          you to set and track your goals in alignment with the global target of 100k in 2026.
        </p>
        <p>
          This tool was developed by the BBT MCI team. For questions, email info@bbtbooks.org.
        </p>
        <p><span className="highlight">Enter your region, country, and community to get Bhadra 2024 Statistics.</span></p>
        <Dropdown 
          label="Region" 
          options={regions} 
          onChange={(e) => setSelectedRegion(e.target.value)} 
          value={selectedRegion}
          valueKey="Region_ID"
          labelKey="Region"
        />
        {selectedRegion && (
          <Dropdown 
            label="Country" 
            options={countries} 
            onChange={(e) => setSelectedCountry(e.target.value)} 
            value={selectedCountry}
            valueKey="Country_ID"
            labelKey="Country"
          />
        )}
        {selectedCountry && (
          <Dropdown 
            label="Community" 
            options={communities} 
            onChange={(e) => setSelectedCommunity(e.target.value)} 
            value={selectedCommunity}
            valueKey="Community_ID"
            labelKey="Community"
          />
        )}
      </div>
      <img src={Simah} alt="Simah" className="Simah" />
    </section>
  );
};

export default MainContent;

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Dropdown from './dropdown.js';
import Simah from './simah.svg';

const MainContent = () => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');

  useEffect(() => {
    fetch('/countries')
      .then(response => response.json())
      .then(data => {
        const countryList = data.data.map(country => country.name);
        setCountries(countryList);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`/regions/${selectedCountry}`)
        .then(response => response.json())
        .then(data => {
          const regionList = data.data.map(region => region.name);
          setRegions(regionList);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedRegion) {
      fetch(`/communities/${selectedRegion}`)
        .then(response => response.json())
        .then(data => {
          const communityList = data.data.map(community => community.name);
          setCommunities(communityList);
        });
    }
  }, [selectedRegion]);

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
        <Dropdown label="Country" options={countries} onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry} />
        {selectedCountry && (
          <Dropdown label="Region" options={regions} onChange={(e) => setSelectedRegion(e.target.value)} value={selectedRegion} />
        )}
        {selectedRegion && (
          <Dropdown label="Community" options={communities} onChange={(e) => setSelectedCommunity(e.target.value)} value={selectedCommunity} />
        )}
      </div>
      <img src={Simah} alt="Simah" className="Simah" />
    </section>
  );
};

export default MainContent;
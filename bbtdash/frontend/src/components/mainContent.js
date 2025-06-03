import React, { useState, useEffect } from 'react';
import Dropdown from './dropdown';
import Simah from './simah.svg';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const baseURL = 'https://ibyld1klsb.execute-api.us-east-1.amazonaws.com';

const MainContent = () => {
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [stats, setStats] = useState([]);


  useEffect(() => {
    fetch(`${baseURL}/regions`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched regions:', data); // 👈 Add this line
        setRegions(data);
      })
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetch(`${baseURL}/countries/${selectedRegion}`)
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(error => console.error('Error fetching countries:', error));
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`${baseURL}/communities/${selectedCountry}`)
        .then(response => response.json())
        .then(data => setCommunities(data))
        .catch(error => console.error('Error fetching communities:', error));
    }
  }, [selectedCountry]);

  useEffect(() => {
  if (selectedCommunity) {
    fetch(`${baseURL}/stats/${selectedCommunity}`)
      .then(response => response.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error));
  }
}, [selectedCommunity]);


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
        <p><span className="highlight">Enter your region, country, and community to get statistics.</span></p>

        <Dropdown 
          label="Region" 
          options={regions} 
          onChange={(e) => setSelectedRegion(e.target.value)} 
          value={selectedRegion}
          valueKey="region_id"
          labelKey="region"
        />

        {selectedRegion && (
          <Dropdown 
            label="Country" 
            options={countries} 
            onChange={(e) => setSelectedCountry(e.target.value)} 
            value={selectedCountry}
            valueKey="country_id"
            labelKey="country"
          />
        )}

        {selectedCountry && (
          <Dropdown 
            label="Community" 
            options={communities} 
            onChange={(e) => setSelectedCommunity(e.target.value)} 
            value={selectedCommunity}
            valueKey="community_id"
            labelKey="community"
          />
        )}

        {selectedCommunity && stats.length > 0 && (
          <div className="stats-box">
            <h3>Stats for Selected Community</h3>
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Campaign</th>
                  <th>Pledged</th>
                  <th>Distributed</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s, index) => (
                  <tr key={index}>
                    <td>{s.year}</td>
                    <td>{s.campaign_name}</td>
                    <td>{s.pledge_count}</td>
                    <td>{s.actual_score_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summed chart by year */}
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ color: '#8fd6f7' }}>Pledge vs Distribution (Total per Year)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={
                  Object.values(
                    stats.reduce((acc, item) => {
                      const year = item.year;
                      if (!acc[year]) {
                        acc[year] = {
                          year,
                          pledge_count: 0,
                          actual_score_count: 0
                        };
                      }
                      acc[year].pledge_count += item.pledge_count || 0;
                      acc[year].actual_score_count += item.actual_score_count || 0;
                      return acc;
                    }, {})
                  )
                }>
                  <XAxis dataKey="year" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pledge_count" fill="#8fd6f7" name="Pledged" />
                  <Bar dataKey="actual_score_count" fill="#f7978f" name="Distributed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      <img src={Simah} alt="Simah" className="Simah" />
    </section>
  );
}

export default MainContent;

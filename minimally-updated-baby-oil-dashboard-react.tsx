import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Label } from 'recharts';

const products = [
  { name: 'Himalaya', price: 127.5, scores: [5,3,5,3,4,4,3,4,5,5], usage: 'Body and Face', ayurvedic: true, oils: ['Mustard Oil', 'Coconut Oil'], vitamins: ['Vitamin E'], focus: 'Balanced', naturalness: 8, effectiveness: 7 },
  { name: 'Dabur', price: 91.5, scores: [5,5,5,5,5,3,4,4,5,4], usage: 'Body', ayurvedic: true, oils: ['Shankhapushpi', 'Masha', 'Ratanjot', 'Karpura', 'Saral taila', 'Tila tail'], vitamins: ['Vitamin E'], focus: 'Bone Strength', naturalness: 9, effectiveness: 8 },
  { name: 'Johnson\'s', price: 120, scores: [3,0,5,2,4,5,5,5,5,4], usage: 'Body and Face', ayurvedic: false, oils: ['Cotton Oil'], vitamins: ['Vitamin E'], focus: 'Skin Nourishment', naturalness: 5, effectiveness: 7 },
  { name: 'Mamaearth', price: 199.5, scores: [5,0,4,3,5,5,4,4,5,5], usage: 'Body', ayurvedic: false, oils: ['Sesame Oil', 'Almond Oil', 'Jojoba Oil'], vitamins: ['Vitamin E', 'B-complex'], focus: 'Skin Nourishment', naturalness: 9, effectiveness: 8 },
  { name: 'Momsco', price: 249, scores: [5,0,5,4,5,4,5,4,4,5], usage: 'Body', ayurvedic: false, oils: ['Jojoba Oil', 'Wheat Germ Oil', 'Chamomile Oil'], vitamins: ['Vitamin E'], focus: 'Skin Nourishment', naturalness: 8, effectiveness: 8 },
  { name: 'Mothersparsh', price: 279.3, scores: [5,4,3,4,5,5,5,5,3,5], usage: 'Body and Scalp', ayurvedic: true, oils: ['Coconut Oil', 'Almond Oil', 'Olive Oil', 'Sesame Oil'], vitamins: [], focus: 'Balanced', naturalness: 9, effectiveness: 7 },
  { name: 'Sebamed', price: 373.3, scores: [5,0,5,3,5,5,5,5,5,4], usage: 'Body and Face', ayurvedic: false, oils: ['Soya Oil', 'Wheat Germ Oil'], vitamins: ['Vitamin F'], focus: 'Skin Protection', naturalness: 7, effectiveness: 9 },
  { name: 'Cetaphil', price: 298, scores: [4,0,5,3,5,5,5,5,5,5], usage: 'Body and Face', ayurvedic: false, oils: ['Sunflower Oil', 'Soybean Oil'], vitamins: ['Vitamin E'], focus: 'Skin Hydration', naturalness: 6, effectiveness: 9 },
  { name: 'Figaro', price: 169, scores: [4,0,4,4,4,4,4,4,5,5], usage: 'Body, Face, and Scalp', ayurvedic: false, oils: ['Olive Oil'], vitamins: ['Vitamin E'], focus: 'Balanced', naturalness: 7, effectiveness: 7 },
  { name: 'Parachute Advansed', price: 102, scores: [5,0,5,5,5,5,5,5,5,5], usage: 'Body', ayurvedic: false, oils: ['Coconut Oil'], vitamins: ['Vitamin E', 'Vitamin F'], focus: 'Bone Strength', naturalness: 9, effectiveness: 9 },
  { name: 'Chicco', price: 519, scores: [5,0,5,4,5,4,5,5,5,5], usage: 'Body', ayurvedic: false, oils: ['Olive Oil', 'Sesame Oil', 'Almond Oil'], vitamins: ['Vitamin E'], focus: 'Skin Nourishment', naturalness: 8, effectiveness: 8 }
];

const attributes = [
  'Natural Ingredients',
  'Ayurvedic Formulation',
  'Clinically Tested',
  'Bone Strengthening',
  'Skin Nourishment',
  'Gentle & Moisturising',
  'Non-sticky',
  'Newborn Suitable',
  'Dermatologically Tested',
  'Chemical-free'
];

const radarChartLabels = [
  'Natural', 'Ayurvedic', 'Tested', 'Bone Str.', 'Skin Nour.',
  'Gentle', 'Non-sticky', 'Newborn', 'Derma Test', 'Chem-free'
];

const Dashboard = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState('Dabur');
  const [showAyurvedic, setShowAyurvedic] = useState(false);
  const [showNatural, setShowNatural] = useState(false);
  const [showAffordable, setShowAffordable] = useState(false);

  const filteredProducts = products.filter(product => 
    (!showAyurvedic || product.ayurvedic) &&
    (!showNatural || product.naturalness >= 7) &&
    (!showAffordable || product.price <= 200)
  );

  const getPerceptualMapData = () => {
    return filteredProducts.map(product => ({
      x: product.naturalness,
      y: product.effectiveness,
      z: product.price,
      name: product.name,
      fill: product.name === 'Himalaya' ? '#ff7300' : product.name === selectedCompetitor ? '#82ca9d' : '#8884d8'
    }));
  };

  const getRadarChartData = () => {
    return attributes.map((attr, index) => ({
      attribute: radarChartLabels[index],
      Himalaya: products.find(p => p.name === 'Himalaya').scores[index],
      Competitor: products.find(p => p.name === selectedCompetitor).scores[index]
    }));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p><strong>{data.name}</strong></p>
          <p>Naturalness: {data.x}/10</p>
          <p>Effectiveness: {data.y}/10</p>
          <p>Price: ₹{data.z}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px', fontSize: '14px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Baby Oil Comparison Dashboard</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          <input type="checkbox" checked={showAyurvedic} onChange={() => setShowAyurvedic(!showAyurvedic)} />
          Ayurvedic
        </label>
        <label style={{ marginRight: '10px' }}>
          <input type="checkbox" checked={showNatural} onChange={() => setShowNatural(!showNatural)} />
          High Naturalness (≥7)
        </label>
        <label>
          <input type="checkbox" checked={showAffordable} onChange={() => setShowAffordable(!showAffordable)} />
          Affordable (≤₹200)
        </label>
      </div>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h2 style={{ fontSize: '18px' }}>Perceptual Map</h2>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
              <XAxis type="number" dataKey="x" name="Naturalness" unit="/10" domain={[0, 10]}>
                <Label value="Naturalness" offset={-20} position="insideBottom" />
              </XAxis>
              <YAxis type="number" dataKey="y" name="Effectiveness" unit="/10" domain={[0, 10]}>
                <Label value="Effectiveness" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
              </YAxis>
              <ZAxis type="number" dataKey="z" range={[40, 400]} name="Price" unit="₹" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {getPerceptualMapData().map((entry, index) => (
                <Scatter key={`scatter-${index}`} name={entry.name} data={[entry]} fill={entry.fill} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '18px' }}>Comparison: Himalaya vs Competitor</h2>
          <select 
            value={selectedCompetitor} 
            onChange={(e) => setSelectedCompetitor(e.target.value)}
            style={{ marginBottom: '10px' }}
          >
            {products.filter(p => p.name !== 'Himalaya').map(product => (
              <option key={product.name} value={product.name}>{product.name}</option>
            ))}
          </select>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={getRadarChartData()}>
              <PolarGrid />
              <PolarAngleAxis dataKey="attribute" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar name="Himalaya" dataKey="Himalaya" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Competitor" dataKey="Competitor" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px' }}>Product Comparison Table</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Product</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Price (₹)</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Usage</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Ayurvedic</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.name} style={{ backgroundColor: product.name === 'Himalaya' ? '#e6f3ff' : 'white' }}>
                <td style={{ padding: '8px' }}>{product.name}</td>
                <td style={{ padding: '8px' }}>{product.price}</td>
                <td style={{ padding: '8px' }}>{product.usage}</td>
                <td style={{ padding: '8px' }}>{product.ayurvedic ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 style={{ fontSize: '18px' }}>Detailed Product Analysis</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Product</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Oils Used</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Vitamins</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Focus</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.name} style={{ backgroundColor: product.name === 'Himalaya' ? '#e6f3ff' : 'white' }}>
                <td style={{ padding: '8px' }}>{product.name}</td>
                <td style={{ padding: '8px' }}>{product.oils.join(', ')}</td>
                <td style={{ padding: '8px' }}>
                  {product.name === 'Mothersparsh' && product.vitamins.length === 0
                    ? 'Unspecified'
                    : product.vitamins.join(', ') || 'None'}
                </td>
                <td style={{ padding: '8px' }}>{product.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

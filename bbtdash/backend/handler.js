'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 5432,
  ssl: { rejectUnauthorized: false },
});

module.exports.getRegions = async () => {
  try {
    console.log('Running Lambda getRegions...');
    const result = await pool.query('SELECT * FROM region');
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database query failed.' }),
    };
  }
};

module.exports.getCountries = async (event) => {
  const regionId = event.pathParameters.regionId;

  try {
    const result = await pool.query(
      'SELECT * FROM country WHERE region_id = $1',
      [regionId]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch countries.' }),
    };
  }
};

module.exports.getCommunities = async (event) => {
  const countryId = event.pathParameters.countryId;

  try {
    const result = await pool.query(
      'SELECT * FROM community WHERE country_id = $1',
      [countryId]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch communities.' }),
    };
  }
};

module.exports.getStats = async (event) => {
  const communityId = event.pathParameters.communityId;

  try {
    const result = await pool.query(
      `
      SELECT 
        p.year,
        c.campaign_name,
        p.pledge_count,
        p.actual_score_count
      FROM participation p
      JOIN campaign c ON p.campaign_id = c.campaign_id
      WHERE p.community_id = $1
      ORDER BY p.year DESC
      `,
      [communityId]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch stats.' }),
    };
  }
};


const express = require('express');
const router = express.Router();
const { supabase } = require('../supabaseClient');

// POST /api/donations - create a new food donation
router.post('/', async (req, res) => {
  try {
    const { 
      food_type, 
      quantity, 
      expiry_date, 
      description, 
      donor_name, 
      phone_number, 
      pickup_address, 
      pickup_time 
    } = req.body || {};

    if (!food_type || !quantity || !expiry_date || !donor_name || !phone_number || !pickup_address) {
      return res.status(400).json({ 
        error: 'food_type, quantity, expiry_date, donor_name, phone_number, pickup_address are required' 
      });
    }

    // Insert into donations table. Requires you to create this table in Supabase:
    // create table donations (
    //   id uuid primary key default gen_random_uuid(),
    //   food_type text not null,
    //   quantity integer not null,
    //   expiry_date timestamptz not null,
    //   description text,
    //   donor_name text not null,
    //   phone_number text not null,
    //   pickup_address text not null,
    //   pickup_time text,
    //   status text default 'available',
    //   claimed_by text,
    //   claimed_at timestamptz,
    //   created_at timestamptz default now()
    // );
    const { data, error } = await supabase.from('donations').insert([
      {
        food_type,
        quantity: parseInt(quantity),
        expiry_date,
        description: description || '',
        donor_name,
        phone_number,
        pickup_address,
        pickup_time: pickup_time || '',
        status: 'available'
      }
    ]).select().single();

    if (error) {
      return res.status(501).json({
        error: 'Storage table missing or RLS preventing insert',
        details: error.message,
        hint: 'Create table donations and allow inserts (RLS policy) for anon key or use service role.'
      });
    }

    return res.status(201).json({ ok: true, donation: data });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/donations - list all available donations
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(501).json({
        error: 'Storage table missing or RLS preventing select',
        details: error.message
      });
    }

    return res.json({ donations: data || [] });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

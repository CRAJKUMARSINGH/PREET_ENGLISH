#!/usr/bin/env node

/**
 * 🧪 CREATE ACCOUNT FUNCTIONALITY TEST (Simple Version)
 * 
 * Tests the Create Account API endpoints and functionality
 * without requiring browser automation
 */

const https = require('https');
const http = require('http');

const SITE_URL = 'https://preetenglish.netlify.app';
const TEST_TIMEOUT = 10000;

// 
// src/utils/currency.js — Saradhya Jewels

/**
 * Format a number as Indian Rupees
 * @param {number} amount
 * @param {boolean} showPaise - show decimal if true
 */
export function formatINR(amount, showPaise = false) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showPaise ? 2 : 0,
    maximumFractionDigits: showPaise ? 2 : 0,
  }).format(amount)
}

/**
 * Format number in Indian style (lakhs, crores)
 */
export function formatIndian(n) {
  return new Intl.NumberFormat('en-IN').format(n)
}

/**
 * Calculate gold jewelry price dynamically
 * @param {number} netWeight - actual metal weight in grams
 * @param {number} goldRatePerGram - current gold rate per gram
 * @param {number} purity - e.g. 0.916 for 22K
 * @param {object} makingCharge - { type: 'PERCENT'|'PER_GRAM', value: number }
 * @param {number} stoneValue - value of stones if any
 * @param {number} gstRate - e.g. 0.03 for 3%
 */
export function calcJewelryPrice({ netWeight, goldRatePerGram, purity = 1, makingCharge = { type: 'PERCENT', value: 12 }, stoneValue = 0, gstRate = 0.03 }) {
  const metalValue = netWeight * goldRatePerGram * purity
  let making = 0
  if (makingCharge.type === 'PERCENT') {
    making = metalValue * (makingCharge.value / 100)
  } else if (makingCharge.type === 'PER_GRAM') {
    making = netWeight * makingCharge.value
  } else {
    making = makingCharge.value
  }
  const subtotal = metalValue + making + stoneValue
  const gst = subtotal * gstRate
  return {
    metalValue: Math.round(metalValue),
    makingCharge: Math.round(making),
    stoneValue: Math.round(stoneValue),
    gst: Math.round(gst),
    total: Math.round(subtotal + gst),
  }
}

/**
 * Compute discount percentage
 */
export function discountPercent(original, discounted) {
  if (!original || original <= discounted) return 0
  return Math.round(((original - discounted) / original) * 100)
}

/**
 * Gold rate per gram by karat from 24K base
 * @param {number} rate24K - price of 24K gold per gram
 * @param {string} karat - '24K'|'22K'|'18K'|'14K'
 */
export function goldRateByKarat(rate24K, karat) {
  const purities = { '24K': 1, '22K': 0.9167, '18K': 0.75, '14K': 0.5833 }
  return Math.round(rate24K * (purities[karat] || 1))
}

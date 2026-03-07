// ============================================================================
// Dashboard Showcase Data
// Mock data for 4 dashboard demos: SaaS, Hotel, Supply Chain, NLP
// ============================================================================

// ─── SaaS Analytics ─────────────────────────────────────────────────────────

export const saasKPIs = [
  { label: "Monthly Revenue", value: "$847K", change: "+12.3%", trend: "up", color: "#4285F4" },
  { label: "Active Users", value: "24.8K", change: "+8.1%", trend: "up", color: "#34A853" },
  { label: "Churn Rate", value: "2.4%", change: "-0.3%", trend: "down", color: "#EA4335" },
  { label: "ARPU", value: "$34.12", change: "+5.2%", trend: "up", color: "#FBBC05" },
];

export const saasMRRData = [
  { month: "Jan", mrr: 412000, target: 420000 },
  { month: "Feb", mrr: 438000, target: 445000 },
  { month: "Mar", mrr: 471000, target: 470000 },
  { month: "Apr", mrr: 502000, target: 500000 },
  { month: "May", mrr: 534000, target: 530000 },
  { month: "Jun", mrr: 578000, target: 565000 },
  { month: "Jul", mrr: 612000, target: 600000 },
  { month: "Aug", mrr: 654000, target: 640000 },
  { month: "Sep", mrr: 701000, target: 680000 },
  { month: "Oct", mrr: 743000, target: 725000 },
  { month: "Nov", mrr: 789000, target: 770000 },
  { month: "Dec", mrr: 847000, target: 820000 },
];

export const saasChurnData = [
  { month: "Jan", rate: 3.1 },
  { month: "Feb", rate: 2.9 },
  { month: "Mar", rate: 3.2 },
  { month: "Apr", rate: 2.8 },
  { month: "May", rate: 2.6 },
  { month: "Jun", rate: 2.7 },
  { month: "Jul", rate: 2.5 },
  { month: "Aug", rate: 2.3 },
  { month: "Sep", rate: 2.1 },
  { month: "Oct", rate: 2.4 },
  { month: "Nov", rate: 2.6 },
  { month: "Dec", rate: 2.4 },
];

export const saasUserGrowth = [
  { month: "Jan", free: 8200, pro: 4100, enterprise: 1200 },
  { month: "Feb", free: 8900, pro: 4400, enterprise: 1250 },
  { month: "Mar", free: 9600, pro: 4800, enterprise: 1320 },
  { month: "Apr", free: 10400, pro: 5100, enterprise: 1380 },
  { month: "May", free: 11200, pro: 5500, enterprise: 1450 },
  { month: "Jun", free: 12100, pro: 5900, enterprise: 1520 },
  { month: "Jul", free: 13000, pro: 6300, enterprise: 1600 },
  { month: "Aug", free: 14100, pro: 6800, enterprise: 1680 },
  { month: "Sep", free: 15300, pro: 7200, enterprise: 1750 },
  { month: "Oct", free: 16500, pro: 7700, enterprise: 1830 },
  { month: "Nov", free: 17800, pro: 8200, enterprise: 1920 },
  { month: "Dec", free: 19200, pro: 8800, enterprise: 2000 },
];

export const saasRevenueByPlan = [
  { name: "Free", value: 0, color: "#94A3B8" },
  { name: "Pro", value: 45, color: "#4285F4" },
  { name: "Enterprise", value: 40, color: "#34A853" },
  { name: "Custom", value: 15, color: "#FBBC05" },
];

export const saasActivityFeed = [
  { id: 1, type: "milestone", message: "MRR crossed $800K milestone", time: "2 hours ago", icon: "trophy" },
  { id: 2, type: "signup", message: "Acme Corp signed up for Enterprise plan", time: "3 hours ago", icon: "user-plus" },
  { id: 3, type: "upgrade", message: "12 users upgraded from Free to Pro", time: "5 hours ago", icon: "arrow-up-circle" },
  { id: 4, type: "churn", message: "2 Pro accounts cancelled subscription", time: "8 hours ago", icon: "user-minus" },
  { id: 5, type: "signup", message: "TechStart Inc joined on Custom plan", time: "12 hours ago", icon: "user-plus" },
  { id: 6, type: "milestone", message: "Active users surpassed 24K", time: "1 day ago", icon: "trophy" },
  { id: 7, type: "upgrade", message: "DataFlow LLC upgraded to Enterprise", time: "1 day ago", icon: "arrow-up-circle" },
  { id: 8, type: "signup", message: "87 new free-tier signups today", time: "1 day ago", icon: "user-plus" },
];

// ─── Hotel Performance ──────────────────────────────────────────────────────

export const hotelKPIs = [
  { label: "Avg Occupancy", value: "78.4%", change: "+3.2%", trend: "up", color: "#4285F4" },
  { label: "ADR", value: "$189", change: "+7.8%", trend: "up", color: "#34A853" },
  { label: "RevPAR", value: "$148.12", change: "+11.2%", trend: "up", color: "#FBBC05" },
  { label: "Guest Score", value: "4.6/5", change: "+0.2", trend: "up", color: "#EA4335" },
];

export const hotelOccupancyTrend = [
  { month: "Jan", occupancy: 65 },
  { month: "Feb", occupancy: 68 },
  { month: "Mar", occupancy: 74 },
  { month: "Apr", occupancy: 79 },
  { month: "May", occupancy: 83 },
  { month: "Jun", occupancy: 92 },
  { month: "Jul", occupancy: 91 },
  { month: "Aug", occupancy: 88 },
  { month: "Sep", occupancy: 80 },
  { month: "Oct", occupancy: 76 },
  { month: "Nov", occupancy: 70 },
  { month: "Dec", occupancy: 75 },
];

export const hotelADRvsRevPAR = [
  { month: "Jan", adr: 152, revpar: 99 },
  { month: "Feb", adr: 158, revpar: 107 },
  { month: "Mar", adr: 165, revpar: 122 },
  { month: "Apr", adr: 172, revpar: 136 },
  { month: "May", adr: 180, revpar: 149 },
  { month: "Jun", adr: 210, revpar: 193 },
  { month: "Jul", adr: 215, revpar: 196 },
  { month: "Aug", adr: 205, revpar: 180 },
  { month: "Sep", adr: 188, revpar: 150 },
  { month: "Oct", adr: 175, revpar: 133 },
  { month: "Nov", adr: 162, revpar: 113 },
  { month: "Dec", adr: 189, revpar: 142 },
];

const hotelProperties = ["The Grand", "Seaside Resort", "City Center", "Mountain Lodge", "Airport Inn", "Beach Villa"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const heatmapValues = {
  "The Grand":      [72, 75, 80, 85, 88, 95, 96, 92, 84, 78, 70, 76],
  "Seaside Resort":  [52, 55, 65, 74, 85, 95, 98, 96, 82, 68, 55, 58],
  "City Center":     [78, 80, 82, 84, 86, 88, 85, 83, 81, 79, 76, 80],
  "Mountain Lodge":  [88, 85, 72, 58, 48, 42, 45, 50, 62, 75, 82, 90],
  "Airport Inn":     [70, 72, 74, 76, 78, 80, 79, 77, 75, 73, 71, 74],
  "Beach Villa":     [45, 48, 60, 72, 88, 96, 98, 95, 80, 65, 50, 48],
};

export const hotelHeatmapData = hotelProperties.flatMap((property) =>
  months.map((month, i) => ({
    property,
    month,
    occupancy: heatmapValues[property][i],
  }))
);

export const hotelMapProperties = [
  { name: "The Grand", lat: 40.7128, lng: -74.006, occupancy: 82, rooms: 320, rating: 4.7 },
  { name: "Seaside Resort", lat: 25.7617, lng: -80.1918, occupancy: 76, rooms: 245, rating: 4.5 },
  { name: "City Center", lat: 34.0522, lng: -118.2437, occupancy: 84, rooms: 280, rating: 4.4 },
  { name: "Mountain Lodge", lat: 39.7392, lng: -104.9903, occupancy: 71, rooms: 120, rating: 4.8 },
  { name: "Airport Inn", lat: 41.8781, lng: -87.6298, occupancy: 75, rooms: 200, rating: 4.2 },
  { name: "Beach Villa", lat: 30.2672, lng: -97.7431, occupancy: 68, rooms: 150, rating: 4.6 },
];

export const hotelPropertyComparison = [
  { name: "The Grand", occupancy: 82, adr: 245, revpar: 201, rating: 4.7, rooms: 320 },
  { name: "Seaside Resort", occupancy: 76, adr: 210, revpar: 160, rating: 4.5, rooms: 245 },
  { name: "City Center", occupancy: 84, adr: 178, revpar: 150, rating: 4.4, rooms: 280 },
  { name: "Mountain Lodge", occupancy: 71, adr: 195, revpar: 138, rating: 4.8, rooms: 120 },
  { name: "Airport Inn", occupancy: 75, adr: 132, revpar: 99, rating: 4.2, rooms: 200 },
  { name: "Beach Villa", occupancy: 68, adr: 265, revpar: 180, rating: 4.6, rooms: 150 },
];

// ─── Supply Chain ───────────────────────────────────────────────────────────

export const supplyChainKPIs = [
  { label: "On-Time Delivery", value: "94.2%", change: "+2.1%", trend: "up", color: "#34A853" },
  { label: "Inventory Turnover", value: "8.3x", change: "+0.7", trend: "up", color: "#4285F4" },
  { label: "Order Accuracy", value: "99.1%", change: "+0.4%", trend: "up", color: "#FBBC05" },
  { label: "Avg Lead Time", value: "4.2 days", change: "-0.8", trend: "down", color: "#EA4335" },
];

export const supplyChainForecast = [
  // Actual data (Jan - Dec)
  { month: "Jan", actual: 4200, forecast: 4200, upper: 4200, lower: 4200 },
  { month: "Feb", actual: 4450, forecast: 4400, upper: 4400, lower: 4400 },
  { month: "Mar", actual: 4680, forecast: 4650, upper: 4650, lower: 4650 },
  { month: "Apr", actual: 4520, forecast: 4600, upper: 4600, lower: 4600 },
  { month: "May", actual: 4890, forecast: 4800, upper: 4800, lower: 4800 },
  { month: "Jun", actual: 5100, forecast: 5050, upper: 5050, lower: 5050 },
  { month: "Jul", actual: 5320, forecast: 5200, upper: 5200, lower: 5200 },
  { month: "Aug", actual: 5050, forecast: 5100, upper: 5100, lower: 5100 },
  { month: "Sep", actual: 5480, forecast: 5400, upper: 5400, lower: 5400 },
  { month: "Oct", actual: 5720, forecast: 5650, upper: 5650, lower: 5650 },
  { month: "Nov", actual: 5900, forecast: 5850, upper: 5850, lower: 5850 },
  { month: "Dec", actual: 6100, forecast: 6050, upper: 6050, lower: 6050 },
  // Forecast data (Jan - Jun, widening confidence bands)
  { month: "Jan*", actual: null, forecast: 6300, upper: 6500, lower: 6100 },
  { month: "Feb*", actual: null, forecast: 6520, upper: 6820, lower: 6220 },
  { month: "Mar*", actual: null, forecast: 6750, upper: 7180, lower: 6320 },
  { month: "Apr*", actual: null, forecast: 6980, upper: 7560, lower: 6400 },
  { month: "May*", actual: null, forecast: 7200, upper: 7950, lower: 6450 },
  { month: "Jun*", actual: null, forecast: 7420, upper: 8360, lower: 6480 },
];

export const supplyChainInventory = [
  { name: "Raw Material A", current: 8500, minimum: 2000, maximum: 12000, status: "healthy", reorderPoint: 3000 },
  { name: "Component B", current: 3200, minimum: 1500, maximum: 8000, status: "healthy", reorderPoint: 2500 },
  { name: "Sub-Assembly C", current: 1800, minimum: 1000, maximum: 5000, status: "warning", reorderPoint: 1500 },
  { name: "Packaging D", current: 12000, minimum: 3000, maximum: 20000, status: "healthy", reorderPoint: 5000 },
  { name: "Electronic Part E", current: 450, minimum: 500, maximum: 4000, status: "critical", reorderPoint: 800 },
  { name: "Fastener Kit F", current: 6200, minimum: 2000, maximum: 10000, status: "healthy", reorderPoint: 3500 },
];

export const supplyChainRadar = [
  { axis: "Cost Efficiency", value: 82 },
  { axis: "Quality", value: 91 },
  { axis: "Speed", value: 78 },
  { axis: "Flexibility", value: 85 },
  { axis: "Reliability", value: 88 },
  { axis: "Sustainability", value: 72 },
];

export const supplyChainSuppliers = [
  { name: "GlobalTech Materials", rating: 4.8, onTime: 97.2, quality: 99.1, leadTime: 3.2, status: "preferred" },
  { name: "Pacific Components", rating: 4.5, onTime: 94.8, quality: 98.3, leadTime: 4.5, status: "approved" },
  { name: "EuroSupply GmbH", rating: 4.2, onTime: 91.5, quality: 97.8, leadTime: 6.1, status: "approved" },
  { name: "QuickShip Logistics", rating: 3.9, onTime: 88.3, quality: 96.2, leadTime: 5.8, status: "probation" },
  { name: "Apex Raw Industries", rating: 4.6, onTime: 95.7, quality: 98.9, leadTime: 3.8, status: "preferred" },
];

export const supplyChainFunnel = [
  { stage: "Orders Received", value: 1000 },
  { stage: "Processing", value: 920 },
  { stage: "Quality Check", value: 875 },
  { stage: "Shipping", value: 850 },
  { stage: "Delivered", value: 823 },
];

// ─── NLP Analytics ──────────────────────────────────────────────────────────

export const nlpKPIs = [
  { label: "Docs Processed", value: "1.2M", change: "+18.5%", trend: "up", color: "#4285F4" },
  { label: "Avg Sentiment", value: "0.72", change: "+0.05", trend: "up", color: "#34A853" },
  { label: "Model Accuracy", value: "91.3%", change: "+1.2%", trend: "up", color: "#FBBC05" },
  { label: "Avg Latency", value: "45ms", change: "-12ms", trend: "down", color: "#EA4335" },
];

export const nlpSentimentTrend = [
  { month: "Jan", positive: 52, neutral: 32, negative: 16, score: 0.62 },
  { month: "Feb", positive: 54, neutral: 30, negative: 16, score: 0.64 },
  { month: "Mar", positive: 53, neutral: 31, negative: 16, score: 0.63 },
  { month: "Apr", positive: 55, neutral: 29, negative: 16, score: 0.65 },
  { month: "May", positive: 56, neutral: 30, negative: 14, score: 0.67 },
  { month: "Jun", positive: 57, neutral: 28, negative: 15, score: 0.68 },
  { month: "Jul", positive: 55, neutral: 30, negative: 15, score: 0.66 },
  { month: "Aug", positive: 56, neutral: 29, negative: 15, score: 0.67 },
  { month: "Sep", positive: 58, neutral: 28, negative: 14, score: 0.70 },
  { month: "Oct", positive: 57, neutral: 29, negative: 14, score: 0.69 },
  { month: "Nov", positive: 59, neutral: 27, negative: 14, score: 0.71 },
  { month: "Dec", positive: 58, neutral: 28, negative: 14, score: 0.72 },
];

export const nlpSentimentDonut = [
  { name: "Positive", value: 58, color: "#34A853" },
  { name: "Neutral", value: 28, color: "#FBBC05" },
  { name: "Negative", value: 14, color: "#EA4335" },
];

export const nlpTopics = [
  { topic: "Customer Service", count: 18420, sentiment: 0.74 },
  { topic: "Product Quality", count: 15380, sentiment: 0.81 },
  { topic: "Pricing", count: 12950, sentiment: 0.52 },
  { topic: "Delivery", count: 11200, sentiment: 0.68 },
  { topic: "User Experience", count: 9840, sentiment: 0.77 },
  { topic: "Technical Support", count: 8620, sentiment: 0.61 },
  { topic: "Billing Issues", count: 6450, sentiment: 0.38 },
  { topic: "Feature Requests", count: 5280, sentiment: 0.85 },
];

export const nlpWordCloud = [
  { text: "sentiment", value: 100 },
  { text: "analysis", value: 92 },
  { text: "transformer", value: 88 },
  { text: "classification", value: 82 },
  { text: "embedding", value: 78 },
  { text: "tokenizer", value: 74 },
  { text: "neural", value: 70 },
  { text: "precision", value: 66 },
  { text: "recall", value: 64 },
  { text: "accuracy", value: 60 },
  { text: "inference", value: 56 },
  { text: "fine-tuning", value: 52 },
  { text: "attention", value: 48 },
  { text: "corpus", value: 44 },
  { text: "entity", value: 40 },
  { text: "extraction", value: 36 },
  { text: "pipeline", value: 32 },
  { text: "latency", value: 28 },
  { text: "throughput", value: 22 },
  { text: "vocabulary", value: 10 },
];

export const nlpModelMetrics = {
  accuracy: 91.3,
  precision: 89.7,
  recall: 92.1,
  f1: 90.9,
};

export const nlpConfusionMatrix = [
  [820, 45, 15],
  [30, 750, 20],
  [10, 35, 275],
];

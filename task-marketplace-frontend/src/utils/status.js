export function getStatusText(status) {
  switch (Number(status)) {
    case 0: return "Open";
    case 1: return "Accepted";
    case 2: return "Submitted";
    case 3: return "Completed";
    case 4: return "Refunded";
    case 5: return "Cancelled";
    default: return "Unknown";
  }
}

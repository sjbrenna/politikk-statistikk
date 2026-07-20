export default function dateTimeXmlToJson(xmlDate: string) {
  const match = /\/Date\((-?\d+)/.exec(xmlDate);
  if (!match) {
    throw new Error(`Invalid date format: ${xmlDate}`);
  }

  return new Date(parseInt(match[1], 10));
}

import { NextRequest, NextResponse } from 'next/server';
import { fetchCatalog } from '../connector-functions';

interface CatalogItem {
  date: string;
  name: string;
  author: string;
  id: string;
  contenttype: string;
  size: string;
  contractIds: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { counterPartyName } = body;
    const result = await fetchCatalog(counterPartyName);

    const formattedResult = result["dcat:dataset"].map((item: any) => ({
      date: item.date || "Unknown Date",
      name: item.name || "Unnamed Asset",
      title: item.description || "No description",
      author: item.author || "Unknown Author",
      id: item.id,
      contenttype: item.contenttype || "Unknown",
      size: item.size || "-",
      contractIds: item["odrl:hasPolicy"]?.["@id"] || []
    }));

    return NextResponse.json(formattedResult);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

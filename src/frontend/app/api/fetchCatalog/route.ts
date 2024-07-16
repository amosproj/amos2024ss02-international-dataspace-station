import { NextRequest, NextResponse } from 'next/server';
import { fetchCatalog } from '../connector-functions';
import { auth } from "@/auth"

interface CatalogItem {
  date: string;
  name: string;
  author: string;
  id: string;
  contenttype: string;
  size: string;
  contractIds: string[];
}

export const POST = auth(async function POST(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const body = await req.json();
    const { counterPartyName } = body;
    const result = await fetchCatalog(counterPartyName);
    const datasets = Array.isArray(result["dcat:dataset"])
                      ? result["dcat:dataset"]
                      : [result["dcat:dataset"]];

    const formattedResult = datasets.map((item: any) => {
      var permission = JSON.parse(JSON.stringify(item["odrl:hasPolicy"]?.["odrl:permission"] || []).replaceAll("odrl:", "").replaceAll("edc:", ""));
      if (JSON.stringify(permission) != "[]") {
        permission = [{
              action: permission.action["@id"],
              constraint: {
                  leftOperand: permission.constraint.leftOperand["@id"],
                  operator: permission.constraint.operator["@id"],
                  rightOperand: permission.constraint.rightOperand
              }
          }];
      }
      return {
        date: item.date || "Unknown Date",
        name: item.name || "Unnamed Asset",
        title: item.description || "No description",
        author: item.author || "Unknown Author",
        id: item.id,
        contenttype: item.contenttype || "Unknown",
        size: item.size || "-",
        contractIds: item["odrl:hasPolicy"]?.["@id"] || null,
        permission: permission
    }});

    var results = JSON.parse(JSON.stringify(formattedResult).replaceAll("odrl:", "").replaceAll("edc:", ""));

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})

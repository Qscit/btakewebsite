"use client";
import { Card } from "@/components/ui/card";
export default function DetailsCountCard({
  title,
  count,    
}: {    
    title: string;  
    count: number;
    }) {    
    return (
        <Card style={{ padding: 20, textAlign: "center" }}>
          <div className="text-lg text-green-800">{title}: </div>
          <div>{count}</div>
        </Card>
    );
}
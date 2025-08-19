// src/components/Testimonial.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export default function Testimonial({ name, role, content, avatar }: TestimonialProps) {
  return (
    <Card className="max-w-md shadow-lg rounded-2xl border">
      <CardHeader className="flex flex-row items-center gap-4">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
            {name[0]}
          </div>
        )}
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 italic">“{content}”</p>
      </CardContent>
    </Card>
  );
}

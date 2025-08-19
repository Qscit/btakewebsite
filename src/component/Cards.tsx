import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

type ServiceCardProps = {
  title: string
  description: string
  content: string
  primaryAction?: string
  secondaryAction?: string
}

export default function ServiceCard({
  title,
  description,
  content,
  primaryAction,
  secondaryAction,
}: ServiceCardProps) {
  return (
    <div className="transform transition duration-300 hover:scale-105">
      <Card className="w-[350px] rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
          <CardDescription className="text-gray-500">
            {description}
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-center">{content}</p>
        </CardContent>

        {/* Footer with actions */}
        {(primaryAction || secondaryAction) && (
          <CardFooter className="flex justify-center gap-4 pt-4">
            {primaryAction && (
              <Button className="rounded-xl shadow-sm hover:shadow-md">
                {primaryAction}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="outline" className="rounded-xl hover:bg-gray-100">
                {secondaryAction}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

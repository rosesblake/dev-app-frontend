"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ApplicationRead } from "@/types/application";
import { Button } from "@/components/ui/button";

export default function ApplicantsList({
  applications,
  onStatusChange,
}: {
  applications: ApplicationRead[];
  onStatusChange: (status: string, appId: number) => void;
}) {
  if (!applications.length) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No one has applied to this project yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Applicants</h2>
      {applications.map((app) => (
        <Card key={app.id} className="border-muted bg-muted/30">
          <CardContent className="p-4 space-y-2">
            <div className="text-base font-medium text-foreground">
              {app.user.name}
            </div>
            {app.user.bio && (
              <p className="text-sm text-muted-foreground">{app.user.bio}</p>
            )}
            <div className="text-sm">
              <span className="font-semibold text-muted-foreground">
                Stack:
              </span>{" "}
              {app.user.stack?.join(", ") || "N/A"}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-muted-foreground">Role:</span>{" "}
              {app.user.role?.join(", ") || "N/A"}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-muted-foreground">
                Status:
              </span>{" "}
              {app.status}
            </div>

            {app.status === "pending" && (
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => onStatusChange("accepted", app.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStatusChange("rejected", app.id)}
                >
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

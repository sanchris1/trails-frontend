/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetSession } from "@/hooks/auth/useGetSession.hook";
import { useUpdateUserDetails } from "@/hooks/users/updateUserDetails";
import { Mail, Save } from "lucide-react";

const UserInformationUpdate = () => {
  const { data: session, isLoading: loadingSession } = useGetSession();

  console.log(session);

  const { mutate: updateDetails, isPending: loadingUpdate } =
    useUpdateUserDetails();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return;
    }

    updateDetails({
      name: trimmedName,
      email: trimmedEmail,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Profile Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>

      {loadingSession ? (
        <CardContent>
          <p>Loading session...</p>
        </CardContent>
      ) : !session ? (
        <CardContent>
          <p>Please sign in to update your profile.</p>
        </CardContent>
      ) : (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                className="h-11"
                required
                disabled={loadingUpdate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  className="h-11 pl-9"
                  required
                  disabled={loadingUpdate}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="gap-2"
                disabled={loadingUpdate || !name.trim() || !email.trim()}
              >
                <Save className="h-4 w-4" />
                {loadingUpdate ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
};

export default UserInformationUpdate;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types";

export function ReadOnlyMemberFields({ user }: { user: User }) {
  return (
    <fieldset className="bg-secondary/40 grid gap-6 rounded-xl border p-4 sm:grid-cols-2 sm:p-5">
      <legend className="text-muted-foreground px-2 text-xs font-semibold tracking-[0.18em] uppercase">
        Added by you
      </legend>

      <div className="space-y-2">
        <Label htmlFor="member-name">User Name</Label>
        <Input
          id="member-name"
          value={user.name}
          readOnly
          className="bg-muted/60 cursor-default"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="member-email">User Email</Label>
        <Input
          id="member-email"
          value={user.email}
          readOnly
          className="bg-muted/60 cursor-default"
        />
      </div>
    </fieldset>
  );
}

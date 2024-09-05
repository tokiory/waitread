import { Progress } from "@/components/ui/progress";
import { useLinkControl } from "@/modules/browser/hooks/useLinkControl";
import type { LinkList } from "@/modules/browser/types/list.types";
import type { FC } from "react";
import { useFilterContext } from "@/modules/browser/hooks/useFilterContext";

export const BrowserProgress = () => {
  const { getAllRead } = useLinkControl();
  const { readlist } = useFilterContext();
  const readAmount = getAllRead().length;

  return (
    <div>
      <div className="mt-4 flex justify-between text-sm font-medium">
        <p>
          Progress: {readAmount} / {readlist.length}
        </p>
        <p className="hidden">Level: Starter</p>
      </div>
      <Progress value={(readAmount * 100) / readlist.length} className="mt-2" />
    </div>
  );
};

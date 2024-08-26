import { Progress } from "@/components/ui/progress";
import { useLinkControl } from "@/modules/browser/hooks/useLinkControl";
import {LINKS} from "@/modules/browser/data/links";

export const BrowserProgress = () => {
  const { getAllRead } = useLinkControl();
  const readAmount = getAllRead().length;

  return (
    <div>
      <div className="mt-4 flex justify-between text-sm font-medium">
        <p>
          Current progress: {readAmount} / {LINKS.length}
        </p>
        <p className="hidden">Level: Starter</p>
      </div>
      <Progress value={(readAmount * 100) / LINKS.length} className="mt-2" />
    </div>
  );
};
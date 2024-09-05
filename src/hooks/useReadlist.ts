import type { LinkList } from "@/modules/browser/types/list.types";
import { useSupabase } from "./useSupabase";
import { useEffect, useState } from "react";

export const useReadlist = () => {
  const [readList, setReadList] = useState<LinkList>([]);

  useEffect(() => {
    const startTime = Date.now();
    const fetchReadList = async () => {
      const { data } = await useSupabase().from("articles").select("*");
      const endTime = Date.now();

      // SLow down a bit, to show better UX
      if (endTime - startTime < 1000) {
        setTimeout(() => {
          setReadList(data! as LinkList);
        }, 1000);
        return;
      }

      setReadList(data! as LinkList);
    };

    fetchReadList();
  }, []);

  return readList;
};

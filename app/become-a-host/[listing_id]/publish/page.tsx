"use client";
import { useBecomeAHostContext } from "@/app/utils/contexts/BecomeAHostContext";
import { useFormSave } from "@/app/utils/hooks/useFormSave";
import { usePathname, useParams, useRouter } from "next/navigation";

export default function Publish() {
  const { navContent, setNavContent, setFormField } = useBecomeAHostContext();
  const router = useRouter();
  const { listing_id } = useParams<{ listing_id: string }>();
  const [handleSave, isSaving, isPending] = useFormSave();
  return (
    <div className="h-full w-full flex justify-center items-center px-8 md:px-[5rem]">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-medium">
            You are all set to publish 🥳🥳
          </h1>
          <p className="font-medium text-black/70">
            your listing is just one click away from being live. Let&apos;s go
            🎊🎉
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => handleSave({ exit: true, publish: true })}
            disabled={isSaving || isPending}
            className="btn animate-pulse"
          >
            {isSaving || isPending ? "Publishing..." : "Publish"}
          </button>
          <button
            onClick={() =>
              router.push(`/become-a-host/${listing_id}/additional-bills`)
            }
            className="hover_btn border border-black/30 !rounded-lg"
          >
            back
          </button>
          <button
            onClick={() => router.push(`/become-a-host/${listing_id}/step-one`)}
            className="hover_btn !rounded-lg underline"
          >
            back to the top
          </button>
        </div>
      </div>
    </div>
  );
}

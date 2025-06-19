"use client";

import UpgradeModal from "@/components/UpgradeModal";
// import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Home() {
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    localStorage.setItem("upgrade", "true");
    const url = new URL(window.location.href);
    url.searchParams.set("upgrade", "true");
    window.history.replaceState({}, "", url.toString());
  };

  const closeModal = () => {
    setModalOpen(false);
    localStorage.removeItem("upgrade");
    const url = new URL(window.location.href);
    url.searchParams.delete("upgrade");
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    const upgradeQuery = searchParams.get("upgrade") === "true";
    const upgradeInHistory = localStorage.getItem("upgrade") === "true";

    if (upgradeQuery || upgradeInHistory) {
      setModalOpen(true);
      localStorage.setItem("upgrade", "true");
    }
  }, []);

  return (
    <div>
      <div>Test</div>
      <button onClick={openModal}>Open Modal</button>
      {modalOpen && <UpgradeModal onClose={closeModal} />}
    </div>
  );
}

function Loading() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

function Error() {
  return (
    <div>
      <p>Error loading data.</p>
    </div>
  );
}

function SuspenseWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
}

export default SuspenseWrapper;

import styles from "./UpgradeModal.module.css";

export default function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-content"]}>
        <p>Modal</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

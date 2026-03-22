interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div
      id="progress-bar"
      style={{ width: `${progress * 100}%` }}
    />
  )
}

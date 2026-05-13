import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTrends } from "../hooks/usePosts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TrendsChart() {
  const { data, isLoading, error } = useTrends();

  if (isLoading) return <p>Loading trends...</p>;
  if (error) return <p>Failed to load trends.</p>;

  const chartData = {
    labels: data.map((d) => `r/${d.subreddit}`),
    datasets: [
      {
        label: "Post Count",
        data: data.map((d) => d._count.id),
        backgroundColor: "rgba(255, 69, 0, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Posts per Subreddit" },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartData: {
      type: Array | Object,
      required: false
    },
    chartLabels: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    gradient: null,
    options: {
      showScale: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          },
          gridLines: {
            display: true,
            color: "#EEF0F4",
            borderDash: [5, 15]
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#EEF0F4",
            borderDash: [5, 15]
          }
        }]
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, 'rgba(37, 99, 235, 0.6)');
    this.gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.25)');
    this.gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: 'reviews',
          borderColor: '#249EBF',
          pointBackgroundColor: 'rgba(0,0,0,0)',
          pointBorderColor: 'rgba(0,0,0,0)',
          pointHoverBorderColor: '#249EBF',
          pointHoverBackgroundColor: '#fff',
          pointHoverRadius: 4,
          pointHitRadius: 10,
          pointHoverBorderWidth: 1,
          borderWidth: 1,
          backgroundColor: this.gradient,
          data: this.chartData
        }
      ]
    }, this.options);
  }
};

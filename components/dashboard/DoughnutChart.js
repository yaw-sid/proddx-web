import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    chartData: {
        type: Array | Object,
        required: false
    },
    chartLabels: {
      type: Array,
      required: true
    },
    chartTitle: {
      type: String,
      required: true
    }
  },

  data: () => ({
    options: {
      title: {
        display: true,
        fontFamily: "'Montserrat', sans-serif",
        text: ""
      }
    }  
  }),

  mounted() {
    this.options.title.text = this.chartTitle;
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          backgroundColor: [
            "rgba(37, 99, 235, 0.2)", 
            "rgba(37, 99, 235, 0.4)", 
            "rgba(37, 99, 235, 0.6)", 
            "rgba(37, 99, 235, 0.8)", 
            "rgb(37, 99, 235)"],
          hoverBackgroundColor: "rgb(37, 99, 235)",
          data: this.chartData
        }
      ]
    }, this.options);
  }
}
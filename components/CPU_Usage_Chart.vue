<template>
  <ClientOnly>
    <div id="chart" class="w-[250px] h-[200px] left-0 top-0 md:w-[400px] md:h-[280px] lg:w-[500px] lg:h-[300px] xl:h-[260px] xl:w-[400px] 2xl:w-[550px] 2xl:h-[350px]">
      <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, watch } from 'vue';

const series = ref([{
  name: 'CPU Usage',
  data: []
}]);

const props = defineProps(['botstatusData']);

// Compute dynamic min and max for the y-axis
const computeYAxisBounds = (dataPoints) => {
  const allYValues = dataPoints.map(point => point.y);
  if (allYValues.length === 0) return { min: 0, max: 100 };
  const minY = Math.min(...allYValues);
  const maxY = Math.max(...allYValues);
  return {
    min: Math.floor(minY),
    max: Math.ceil(maxY),
    labels: {
      style: {
        fontSize: "7px",
        color: '#666',
        fontFamily: 'Lineseed',
        fontWeight: 400
      }
    }
  };
};

// Function to trim series data to last 60 seconds
const trimSeriesDataToLast60Seconds = (dataPoints) => {
  const now = new Date();
  return dataPoints.filter(point => (now - point.x) <= 60000); // Keep only data points from the last 60 seconds
};

// Initial chart options with zoom enabled
const initialChartOptions = {
  chart: {
    height: "100%",
    width: "100%",
    type: 'line',
    zoom: {
      enabled: false
    },
  },
  stroke: {
    width: 5,
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 10,
    labels: {
      formatter: function (value, timestamp) {
        return new Date(timestamp).toLocaleTimeString();
      },
      style: {
        fontSize: "7px",
        color: '#666',
        fontFamily: 'Lineseed',
        fontWeight: 400
      }
    }
  },
  title: {
    text: 'CPU Usage (%)',
    align: 'left',
    style: {
      fontSize: "16px",
      color: '#666',
      fontFamily: 'Lineseed',
      fontWeight: 600
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#FDD835'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    },
  },
  yaxis: {
    min: 0,
    max: 100
  },
  responsive: [
    {
      breakpoint: 767,
      options: {
        title: {
          style: {
            fontSize: "14px"
          }
        },
        stroke: {
          width: 3
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "7px"
            }
          }
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "7px"
            }
          }
        }
      }
    },
    {
      breakpoint: 1023,
      options: {
        title: {
          style: {
            fontSize: "20px"
          }
        },
        stroke: {
          width: 5
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "14px"
            }
          }
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "14px"
            }
          }
        }
      }
    },
    {
      breakpoint: 1279,
      options: {
        title: {
          style: {
            fontSize: "25px"
          }
        },
        stroke: {
          width: 5
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "15px"
            }
          }
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "15px"
            }
          }
        }
      }
    },
    {
      breakpoint: 1000000,
      options: {
        title: {
          style: {
            fontSize: "25px"
          }
        },
        stroke: {
          width: 5
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "15px"
            }
          }
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "15px"
            }
          }
        }
      }
    }
  ],
};

const chartOptions = ref({ ...initialChartOptions });

watch(() => props.botstatusData, (newData) => {
  if (newData && newData.cpu_usage !== undefined) {
    const now = new Date();
    series.value[0].data.push({ x: now, y: newData.cpu_usage });
    // Trim the series data to keep only the last 60 seconds
    series.value[0].data = trimSeriesDataToLast60Seconds(series.value[0].data);
    // Recalculate y-axis bounds based on updated series data
    const newBounds = computeYAxisBounds(series.value[0].data);
    // Update chart options - create a new object to ensure reactivity
    chartOptions.value = {
      ...chartOptions.value,
      yaxis: newBounds
    };
  }
}, { deep: true, immediate: true });

</script>

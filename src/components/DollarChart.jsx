import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const DollarChart = () => {
  const { data } = useSelector((state) => state.dollar);

  const chartData = useMemo(() => {
    return data.map((item) => [
      new Date(item.fecha).getTime(), // x = timestamp
      parseFloat(item.valor),         // y = valor
    ]);
  }, [data]);

  const options = {
    title: {
      text: 'Fluctuación del Dólar',
    },
    rangeSelector: {
      selected: 1,
    },
    series: [
      {
        name: 'USD',
        data: chartData,
        tooltip: {
          valueDecimals: 2,
        },
        type: 'line',
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  );
};

export default DollarChart;

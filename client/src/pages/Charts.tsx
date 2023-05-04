import { Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import userStore from '../store';
import { Person } from '../PersonType';
import { useNavigate } from 'react-router-dom';
import Button from 'antd/es/button';
import styled from 'styled-components';

interface CityCount {
  city: string;
  count: number;
}

interface Percentage {
  city: string;
  percentage: number;
}

const Charts = () => {
  const navigate = useNavigate();

  const { users, fetchUsers } = userStore(state => state);

  const groupedData: Record<string, Person[]> = users.reduce((acc, person) => {
    if (!acc[person.address.city]) {
      acc[person.address.city] = [];
    }

    acc[person.address.city].push(person);
    return acc;
  }, {});

  const cityCounts: CityCount[] = Object.keys(groupedData).map(city => {
    return {
      city: city,
      count: groupedData[city].length,
    };
  });

  // Calculate the total number of people
  const total: number = users.length;

  // Calculate the percentage of people in each city
  const percentages: Percentage[] = cityCounts.map(cityCount => {
    return {
      city: cityCount.city,
      percentage: (cityCount.count / total) * 100,
    };
  });

  console.log(percentages);

  useEffect(() => {
    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DemoPie = () => {
    const config = {
      appendPadding: 10,
      data: percentages,
      angleField: 'percentage',
      colorField: 'city',
      radius: 0.8,
      label: {
        type: 'outer',
        content: '{name} {percentage}',
      },
      interactions: [
        {
          type: 'pie-legend-active',
        },
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie {...config} />;
  };

  return (
    <Container>
      <Button onClick={() => navigate('/')}>Back</Button>
      <DemoPie />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

export default Charts;

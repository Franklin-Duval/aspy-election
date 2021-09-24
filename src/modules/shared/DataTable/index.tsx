import styled from '@emotion/styled';
import { Input, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { PRIMARY } from 'src/shared/colors';

const DataTableContainer = styled.div`
  zoom: 0.9;

  th {
    background-color: ${PRIMARY} !important;
    color: white !important;
    font-weight: bold;
  }

  .odd-row {
    background-color: #e0e0e0;
  }

  .even-row {
    background-color: #fafafa;
  }

  @media (min-width: 768px) {
    zoom: 1;
  }
`;

export const DataTable = <T extends { _id: string }>({
  data,
  columns,
  filterFunction,
  onItemClick,
  AddButton = <span>Add a button please</span>,
}: {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
  filterFunction?: (dataItem: T, filterValue: string) => boolean;
  onItemClick?: (item: T) => void;
  AddButton?: React.ReactElement;
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [rowId, setRowId] = useState('');

  const dataToShow = data?.filter((dataItem) =>
    filterFunction?.(dataItem, filterValue),
  );
  return (
    <DataTableContainer>
      <Space style={{ marginBottom: 10 }}>
        <Input
          placeholder='Enter a name to filter'
          style={{ maxWidth: 200 }}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        {AddButton}
      </Space>
      <Table
        dataSource={dataToShow}
        columns={columns}
        size='small'
        rowKey='_id'
        rowClassName={(row, index) =>
          rowId == row._id ? 'is-bold' : index % 2 == 0 ? 'even-row' : 'odd-row'
        }
        onRow={(row) => ({
          onClick: () => {
            setRowId(row._id);
            onItemClick?.(row);
          },
        })}
      ></Table>
    </DataTableContainer>
  );
};

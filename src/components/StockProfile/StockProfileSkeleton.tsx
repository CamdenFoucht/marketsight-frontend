import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'emotion-theming';

const StockProfileSkeleton = (props: any) => {
  const theme: any = useTheme();
  return (
    <ContentLoader
      speed={1.75}
      height={1000}
      width={'100%'}
      backgroundColor={theme.skeletonBackground}
      foregroundColor={theme.skeletonForeground}
      {...props}
    >
      <rect x='0' y='20' rx='2' ry='2' width='180' height='25' />
      <rect x='100%' y='20' rx='2' ry='2' width='180' height='25' />
      <rect x='0' y='55' rx='2' ry='2' width='180' height='25' />
      <rect x='0' y='90' rx='2' ry='2' width='180' height='25' />
      <rect x='0' y='180' rx='2' ry='2' width='100%' height='400' />
      <rect x='0' y='650' rx='2' ry='2' width='100%' height='25' />
      <rect x='0' y='700' rx='2' ry='2' width='100%' height='10' />
      <rect x='0' y='725' rx='2' ry='2' width='100%' height='10' />
      <rect x='0' y='750' rx='2' ry='2' width='100%' height='10' />
      <rect x='0' y='775' rx='2' ry='2' width='100%' height='10' />
      <rect x='0' y='800' rx='2' ry='2' width='100%' height='10' />
      <rect x='0' y='825' rx='2' ry='2' width='100%' height='10' />
      <rect x='0' y='850' rx='2' ry='2' width='100%' height='10' />
      <rect x='0' y='875' rx='2' ry='2' width='100%' height='10' />
      <rect x='0' y='900' rx='2' ry='2' width='50%' height='10' />
    </ContentLoader>
  );
};

export default StockProfileSkeleton;

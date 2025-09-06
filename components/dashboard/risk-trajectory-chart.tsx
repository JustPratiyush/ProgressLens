"use client";


import useSWR from "swr";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


// Define the type for our trajectory data
interface TrajectoryData {
  name: string;
  gradeChange: number;
  attendanceChange: number;
  quadrant: "star" | "concern" | "burnout" | "disengaged";
}


// SWR fetcher function
const fetcher = (url: string): Promise<TrajectoryData[]> => fetch(url).then((res) => res.json());


const QUADRANT_COLORS = {
  star: "#22c55e",       // Green
  concern: "#ef4444",    // Red
  burnout: "#f59e0b",    // Amber
  disengaged: "#3b82f6", // Blue
};


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <p className="font-bold">{data.name}</p>
        <p className={`text-sm ${data.gradeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {`Grade Change: ${data.gradeChange > 0 ? '+' : ''}${data.gradeChange}%`}
        </p>
        <p className={`text-sm ${data.attendanceChange >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
          {`Attendance Change: ${data.attendanceChange > 0 ? '+' : ''}${data.attendanceChange}%`}
        </p>
      </div>
    );
  }
  return null;
};


export function RiskTrajectoryChart() {
  // Fetch real data from our new API endpoint
  const { data, isLoading, error } = useSWR('/api/students/trajectory', fetcher);


  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/2 rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md mt-1" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[400px] w-full rounded-lg" />
            </CardContent>
        </Card>
    )
  }


  if (error || !data || !Array.isArray(data)) {
    return <Card><CardContent><p className="text-center text-muted-foreground p-4">Could not load trajectory data.</p></CardContent></Card>
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Risk Trajectory</CardTitle>
        <CardDescription>
          Shows simulated student progress over the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis 
                type="number" 
                dataKey="attendanceChange" 
                name="Attendance Change" 
                unit="%" 
                label={{ value: "Attendance Change (%)", position: 'insideBottom', offset: -10 }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <YAxis 
                type="number" 
                dataKey="gradeChange" 
                name="Grade Change" 
                unit="%" 
                label={{ value: "Grade Change (%)", angle: -90, position: 'insideLeft' }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              
              <ReferenceLine y={0} stroke="#a1a1aa" strokeDasharray="3 3" />
              <ReferenceLine x={0} stroke="#a1a1aa" strokeDasharray="3 3" />
              
              <Scatter name="Students" data={data}>
                 {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={QUADRANT_COLORS[entry.quadrant]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

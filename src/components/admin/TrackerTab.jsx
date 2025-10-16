
import React, { useState, useEffect } from 'react';
import { ClickTracker } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MousePointer, Calendar, TrendingUp, BarChart3, Gift } from 'lucide-react';
import { format, startOfDay, endOfDay } from 'date-fns';

const StatCard = ({ title, value, icon: Icon, details }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-zinc-600">{title}</CardTitle>
      <Icon className="h-4 w-4 text-zinc-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {details && <p className="text-xs text-zinc-500">{details}</p>}
    </CardContent>
  </Card>
);

export default function TrackerTab() {
  const [clicks, setClicks] = useState([]);
  const [filteredClicks, setFilteredClicks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchClicks();
  }, []);

  useEffect(() => {
    // Move filterClicks logic directly into useEffect
    let filtered = clicks;

    if (startDate) {
      const start = startOfDay(new Date(startDate));
      filtered = filtered.filter(click => new Date(click.created_date) >= start);
    }

    if (endDate) {
      const end = endOfDay(new Date(endDate));
      filtered = filtered.filter(click => new Date(click.created_date) <= end);
    }

    setFilteredClicks(filtered);
  }, [clicks, startDate, endDate]); // Dependencies correctly listed

  const fetchClicks = async () => {
    try {
      setIsLoading(true);
      const clickData = await ClickTracker.list('-created_date', 1000);
      setClicks(clickData);
    } catch (error) {
      console.error("Failed to fetch click data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStats = () => {
    const getMyReadingClicks = filteredClicks.filter(c => c.button_type === 'get_my_reading').length;
    const unlockSessionClicks = filteredClicks.filter(c => c.button_type === 'unlock_private_session').length;
    const thanksUpsellClicks = filteredClicks.filter(c => c.button_type === 'thanks_page_upsell').length;
    const totalClicks = filteredClicks.length;

    return {
      getMyReadingClicks,
      unlockSessionClicks,
      thanksUpsellClicks,
      totalClicks
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Date Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-zinc-600">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-zinc-600">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button onClick={() => {setStartDate(''); setEndDate('')}} variant="outline">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard 
          title="Get My Reading" 
          value={stats.getMyReadingClicks} 
          icon={MousePointer} 
          details="Total clicks"
        />
        <StatCard 
          title="Unlock Private Session" 
          value={stats.unlockSessionClicks} 
          icon={TrendingUp} 
          details="Total clicks"
        />
        <StatCard 
          title="Thanks Page Upsell" 
          value={stats.thanksUpsellClicks} 
          icon={Gift} 
          details="Total clicks"
        />
        <StatCard 
          title="Total Clicks" 
          value={stats.totalClicks} 
          icon={BarChart3} 
          details="All buttons combined"
        />
      </div>

      {/* Click Table */}
      <Card>
        <CardHeader>
          <CardTitle>Click Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Button</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : filteredClicks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center">No clicks found</TableCell>
                  </TableRow>
                ) : (
                  filteredClicks.map((click) => (
                    <TableRow key={click.id}>
                      <TableCell className="font-medium">
                        {click.button_type === 'get_my_reading' ? 'Get My Reading' : 
                         click.button_type === 'unlock_private_session' ? 'Unlock Private Session' :
                         'Thanks Page Upsell'
                        }
                      </TableCell>
                      <TableCell>
                        {click.user_email || 'Anonymous'}
                      </TableCell>
                      <TableCell>
                        {format(new Date(click.created_date), "dd/MM/yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        {click.ip_address || 'Unknown'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus } from "lucide-react";
import { AddStudentForm } from "@/components/forms/AddStudentForm";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { Pagination } from "@/components/ui/pagination";
import { PageSizeSelector } from "@/components/ui/PageSizeSelector";
import { Loader } from "@/components/ui/Loader";
import { SearchInput } from "@/components/ui/SearchInput";

type Student = {
  name: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  student_email_id?: string;
  student_mobile_number?: string;
  joining_date?: string;
  image?: string;
  date_of_birth?: string;
  blood_group?: string;
  gender?: string;
  nationality?: string;
  student_applicant?: string;
  student_name?: string;
  address_line_1?: string;
  address_line_2?: string;
  pincode?: string;
  city?: string;
  state?: string;
  country?: string;
  customer?: string;
  customer_group?: string;
  leaving_certificate_number?: string;
  date_of_leaving?: string;
  reason_for_leaving?: string;
  guardians?: any[];
};

const colors = [
  "#F87171", // red
  "#60A5FA", // blue
  "#34D399", // green
  "#FBBF24", // yellow
  "#A78BFA", // purple
  "#F472B6", // pink
  "#FCD34D", // amber
  "#38BDF8", // cyan
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: students = [], isLoading } = useFrappeGetDocList<Student>(
    "Student",
    {
      fields: [
        "name",
        "first_name",
        "middle_name",
        "last_name",
        "student_email_id",
        "student_mobile_number",
        "joining_date",
        "image",
        "date_of_birth",
        "blood_group",
        "gender",
        "nationality",
        "student_applicant",
        "student_name",
        "address_line_1",
        "address_line_2",
        "pincode",
        "city",
        "state",
        "country",
        "customer",
        "customer_group",
        "leaving_certificate_number",
        "date_of_leaving",
        "reason_for_leaving",
        "guardians",
      ],
      filters: [
        ["student_name", "like", `${searchQuery}%`],
       
      ],
      limit_start: (currentPage - 1) * pageSize,
      limit: pageSize,
      orderBy: { field: "creation", order: "desc" },
    }
  );

  if (isLoading) {
    return (
      <Shell>
        <Loader />
      </Shell>
    );
  }
  const display = (value: any) => (value || value === 0 ? value : "N/A");

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl ">Students</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage student records and profiles
            </p>
          </div>
          <Button
            className="gap-2 w-full sm:w-auto"
            onClick={() => setShowAddDialog(true)}
          >
            <UserPlus className="w-4 h-4" />
            Add Student
          </Button>
        </div>

        {/* Search & Table */}
        <Card>
          <CardHeader>
            <div className="relative flex-1">
              <SearchInput
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                placeholder="Search by Name"
                debounceMs={300}
              />
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students?.map((student) => (
                  <TableRow
                    key={student.name}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {student?.image ? (
                            <AvatarImage src={student?.image} />
                          ) : (
                            <AvatarFallback
                              className="flex items-center bg-[] justify-center text-white"
                              style={{
                                backgroundColor: getRandomColor(),
                              }}
                            >
                              {student?.first_name?.[0]}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="">
                            {display(student.first_name)}{" "}
                            {display(student.last_name)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {display(student.student_name)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{display(student.student_email_id)}</TableCell>
                    <TableCell>{display(student.city)}</TableCell>
                    <TableCell>
                      {display(student.student_mobile_number)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <PageSizeSelector
          pageSize={pageSize}
          onChange={(size) => {
            setPageSize(size);
          }}
        />

        {/* Add Student Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <AddStudentForm onSuccess={() => setShowAddDialog(false)} />
          </DialogContent>
        </Dialog>

        {/* Student Detail Dialog */}
        {/* Student Detail Dialog */}
        <Dialog
          open={!!selectedStudent}
          onOpenChange={() => setSelectedStudent(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6  rounded-xl shadow-lg">
            {selectedStudent && (
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Left: Avatar + Basic Info */}
                <div className="flex flex-col items-center sm:items-start gap-4 w-full sm:w-1/3">
                  {selectedStudent.image ? (
                    <Avatar className="w-28 h-28">
                      <AvatarImage src={selectedStudent.image} />
                    </Avatar>
                  ) : (
                    <div
                      className="flex items-center justify-center w-28 h-28 rounded-full text-2xl font-semibold text-white shadow-md"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      {selectedStudent.first_name?.[0]}
                    </div>
                  )}
                  <div className="text-center sm:text-left">
                    <p className="text-2xl font-bold">
                      {display(selectedStudent.first_name)}{" "}
                      {display(selectedStudent.last_name)}
                    </p>
                    <p className="text-muted-foreground">
                      {display(selectedStudent.student_email_id)}
                    </p>
                    <p className="text-muted-foreground">
                      {display(selectedStudent.student_mobile_number)}
                    </p>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex-1 flex flex-col gap-6">
                  {/* Personal Info */}
                  <Card>
                    <CardHeader>
                      <p className="font-semibold">Personal Info</p>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Middle Name
                        </p>
                        <p>{display(selectedStudent.middle_name)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Joining Date
                        </p>
                        <p>{display(selectedStudent.joining_date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Date of Birth
                        </p>
                        <p>{display(selectedStudent.date_of_birth)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Blood Group
                        </p>
                        <p>{display(selectedStudent.blood_group)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p>{display(selectedStudent.gender)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Nationality
                        </p>
                        <p>{display(selectedStudent.nationality)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Address Info */}
                  <Card>
                    <CardHeader>
                      <p className="font-semibold">Address</p>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Address Line 1
                        </p>
                        <p>{display(selectedStudent.address_line_1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Address Line 2
                        </p>
                        <p>{display(selectedStudent.address_line_2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pincode</p>
                        <p>{display(selectedStudent.pincode)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">City</p>
                        <p>{display(selectedStudent.city)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">State</p>
                        <p>{display(selectedStudent.state)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p>{display(selectedStudent.country)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Guardians */}
                  <Card>
                    <CardHeader>
                      <p className="font-semibold">Guardians</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedStudent.guardians?.length ? (
                        selectedStudent.guardians.map((g: any, i: number) => (
                          <p key={i} className="pl-2 py-1 border-b">
                            {display(g.name)}
                          </p>
                        ))
                      ) : (
                        <p>N/A</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Exit Info */}
                  <Card>
                    <CardHeader>
                      <p className="font-semibold">Exit Info</p>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Customer
                        </p>
                        <p>{display(selectedStudent.customer)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Customer Group
                        </p>
                        <p>{display(selectedStudent.customer_group)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Leaving Certificate No.
                        </p>
                        <p>
                          {display(selectedStudent.leaving_certificate_number)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Date of Leaving
                        </p>
                        <p>{display(selectedStudent.date_of_leaving)}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-sm text-muted-foreground">
                          Reason for Leaving
                        </p>
                        <p>{display(selectedStudent.reason_for_leaving)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Shell>
  );
};

export default Students;

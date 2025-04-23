import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CalendarCheck, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useMsal } from "@azure/msal-react";
import { DocumentUpload } from "@/components/leave-request/DocumentUpload";
import { format } from "date-fns";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchLeaveTypes = async () => {
  const { data: leaveTypes } = await axios.get(`${VITE_API_URL}/leave-types`, {
    withCredentials: true,
  });
  return leaveTypes;
};

const submitLeaveRequest = async (formData: FormData) => {
  console.log({ formData });
  const { data } = await axios.post(
    `${VITE_API_URL}/leaves/apply-leave`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

const NewLeaveRequest = () => {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const queryClient = useQueryClient();

  const {
    data: leaveTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: fetchLeaveTypes,
  });
  const { accounts } = useMsal();

  const mutation = useMutation({
    mutationFn: submitLeaveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
      reset();
    },
  });

  const onSubmit = (data) => {
    console.log({ data });
    const formData = new FormData();
    formData.append(
      "leaveRequest",
      JSON.stringify({
        employeeEmail: accounts[0].username,
        leaveTypeId: data.leaveType,
        leaveReason: data.leaveReason,
        // startDate: format(new Date(data.startDate), "yyyy-MM-dd"),
        // endDate: format(new Date(dat
      })
    );
    data.supportingDocuments.forEach((file: File) => {
      formData.append("files", file);
    });
    console.log(formData, "+++++++++++++++++++++");

    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
        reset();
      },
    });
  };

  if (isLoading) return <p>Loading leave types...</p>;
  if (error) return <p>Failed to load leave types</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="flex items-center mb-6">
          <CalendarCheck className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            New Leave Request
          </h1>
        </div>

        <Card className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Leave Request Form</CardTitle>
              <CardDescription>
                Submit a new leave request for approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="leave-type">Leave Type</Label>
                  <Controller
                    name="leaveType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="leave-type">
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {leaveTypes?.map((type) => (
                              <SelectItem
                                textValue={type.name}
                                key={type.id}
                                value={type.id}
                              >
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <Controller
                  name="isHalfDay"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2 pt-6">
                      <Switch
                        id="isHalfDay"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="isHalfDay">Half Day Request</Label>
                    </div>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="rounded-md border"
                      />
                      {field.value && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {format(field.value, "PPP")}
                        </p>
                      )}
                    </div>
                  )}
                />

                {!watch("isHalfDay") && (
                  <Controller
                    name="endDate"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="rounded-md border"
                        />
                        {field.value && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {format(field.value, "PPP")}
                          </p>
                        )}
                      </div>
                    )}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea
                  id="reason"
                  {...register("leaveReason")}
                  placeholder="Please provide a reason for your leave request"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supporting-documents">
                  Supporting Documents (optional)
                </Label>
                <Controller
                  name="supportingDocuments"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange } }) => (
                    <DocumentUpload onFilesChange={onChange} maxFiles={5} />
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Leave Request"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewLeaveRequest;

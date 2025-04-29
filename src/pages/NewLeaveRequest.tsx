import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarCheck, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useMsal } from "@azure/msal-react";
import { DocumentUpload } from "@/components/leave-request/DocumentUpload";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeaveTypeField } from "@/components/leave-request/LeaveTypeField";
import { HalfDaySwitch } from "@/components/leave-request/HalfDaySwitch";
import { toast } from "sonner";
import { leaveFormSchema, LeaveFormValues } from "@/schemas/leaveRequestschema";
import { DateRangeFields } from "@/components/leave-request/DateRangeField";
import { LeaveReasonField } from "@/components/leave-request/LeaveReason";
import { Form } from "@/components/ui/form";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchLeaveTypes = async () => {
  const { data: leaveTypes } = await axios.get(`${VITE_API_URL}/leave-types`, {
    withCredentials: true,
  });
  return leaveTypes;
};

const submitLeaveRequest = async (formData: FormData) => {
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
  const queryClient = useQueryClient();
  const { accounts } = useMsal();

  const form = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      leaveTypeId: undefined,
      isHalfDay: false,
      startDate: undefined,
      endDate: undefined,
      leaveReason: undefined,
      supportingDocuments: [],
    },
    mode: "onBlur",
  });

  const { watch, handleSubmit, formState, getValues } = form;
  const { isSubmitting, errors } = formState;
  const isHalfDay = watch("isHalfDay");
  const values = getValues();
  console.log({ errors, values });
  const {
    data: leaveTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: fetchLeaveTypes,
  });

  const mutation = useMutation({
    mutationFn: submitLeaveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
      form.reset();
      toast.success("Leave request submitted successfully!");
    },
    onError: (error) => {
      console.error("Error submitting leave request:", error);
      toast.error("Failed to submit leave request. Please try again.");
    },
  });

  const onSubmit = (data: LeaveFormValues) => {
    console.log({ data });
    const formData = new FormData();
    formData.append(
      "leaveRequest",
      new Blob(
        [
          JSON.stringify({
            userEmail: accounts[0].username,
            leaveTypeId: data.leaveTypeId,
            reason: data.leaveReason,
            isHalfDay: data.isHalfDay,
            startDate: data.startDate
              ? format(data.startDate, "yyyy-MM-dd").toString()
              : null,
            endDate: data.endDate
              ? format(data.endDate, "yyyy-MM-dd").toString()
              : null,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (data.supportingDocuments && data.supportingDocuments.length > 0) {
      data.supportingDocuments.forEach((file: File) => {
        formData.append("files", file);
      });
    }

    mutation.mutate(formData);
  };

  if (isLoading) return <p className="p-8">Loading leave types...</p>;
  if (error)
    return <p className="p-8 text-destructive">Failed to load leave types</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex items-center mb-6">
          <CalendarCheck className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            New Leave Request
          </h1>
        </div>

        <Card className="">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Leave Request Form</CardTitle>
                <CardDescription>
                  Submit a new leave request for approval
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LeaveTypeField form={form} leaveTypes={leaveTypes} />
                  <HalfDaySwitch form={form} />
                </div>

                <DateRangeFields form={form} isHalfDay={isHalfDay} />
                <LeaveReasonField form={form} />

                <DocumentUpload form={form} maxFiles={5} />
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
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default NewLeaveRequest;

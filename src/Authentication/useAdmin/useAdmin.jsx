import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useFirebase from "../useFirebase/useFirebase";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user, loading } = useFirebase();
  const axiosSecure = useAxiosSecure();

  // ****** useQuery or axios both can be used for useAdmin******

  // const { data: isAdmin, isPending: isAdminLoading } = useQuery({
  //       queryKey: [user?.email, 'isAdmin'],
  //       queryFn: async () => {
  //           const res = await axiosSecure.get(`/users/admin/${user.email}`);
  //           console.log(res.data);
  //           return res.data?.admin;
  //       }
  //   })
  // return [isAdmin, isAdminLoading]

  const [isAdmin, setIsAdmin] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user?.email) {
        try {
          setIsAdminLoading(true);
          const response = await axiosSecure.get(`/users/admin/${user.email}`);
          setIsAdmin(response.data?.admin);
        } catch (error) {
          console.error("Error fetching admin status:", error);
          setIsAdmin(false);
        } finally {
          setIsAdminLoading(false);
        }
      } else {
        setIsAdmin(false);
        setIsAdminLoading(false);
      }
    };

    fetchAdminStatus();
  }, [user?.email, axiosSecure]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
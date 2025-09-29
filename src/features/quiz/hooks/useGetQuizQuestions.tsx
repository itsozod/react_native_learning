import { getQuizzes } from "@entities/quiz";
import { useQuery } from "@tanstack/react-query";

const useGetQuizQuestions = (id: string | string[]) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [id],
    queryFn: async () => getQuizzes(id),
  });
  return { data, isLoading, isSuccess };
};

export default useGetQuizQuestions;

from EvaluationData import EvaluationData
from EvaluatedAlgorithm import EvaluatedAlgorithm

class Evaluator:
    
    algorithms = []
    
    def __init__(self, dataset, rankings):
        ed = EvaluationData(dataset, rankings)
        self.dataset = ed
        
    def AddAlgorithm(self, algorithm, name):
        alg = EvaluatedAlgorithm(algorithm, name)
        self.algorithms.append(alg)
        
    def Evaluate(self, doTopN):
        results = {}
        for algorithm in self.algorithms:
            print("Evaluating ", algorithm.GetName(), "...")
            results[algorithm.GetName()] = algorithm.Evaluate(self.dataset, doTopN)

        # Print results
        print("\n")
        
        if (doTopN):
            print("{:<10} {:<10} {:<10} {:<10} {:<10} {:<10} {:<10} {:<10} {:<10}".format(
                    "Algorithm", "RMSE", "MAE", "HR", "cHR", "ARHR", "Coverage", "Diversity", "Novelty"))
            for (name, metrics) in results.items():
                print("{:<10} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f} {:<10.4f}".format(
                        name, metrics["RMSE"], metrics["MAE"], metrics["HR"], metrics["cHR"], metrics["ARHR"],
                                      metrics["Coverage"], metrics["Diversity"], metrics["Novelty"]))
        else:
            print("{:<10} {:<10} {:<10}".format("Algorithm", "RMSE", "MAE"))
            for (name, metrics) in results.items():
                print("{:<10} {:<10.4f} {:<10.4f}".format(name, metrics["RMSE"], metrics["MAE"]))
                
        print("\nLegend:\n")
        print("RMSE:      Root Mean Squared Error. Lower values mean better accuracy.")
        print("MAE:       Mean Absolute Error. Lower values mean better accuracy.")
        if (doTopN):
            print("HR:        Hit Rate; how often we are able to recommend a left-out rating. Higher is better.")
            print("cHR:       Cumulative Hit Rate; hit rate, confined to ratings above a certain threshold. Higher is better.")
            print("ARHR:      Average Reciprocal Hit Rank - Hit rate that takes the ranking into account. Higher is better." )
            print("Coverage:  Ratio of users for whom recommendations above a certain threshold exist. Higher is better.")
            print("Diversity: 1-S, where S is the average similarity score between every possible pair of recommendations")
            print("           for a given user. Higher means more diverse.")
            print("Novelty:   Average popularity rank of recommended items. Higher means more novel.")

    def SampleTopNRecs(self, testSubject, k=10):
        recommendations_list = []

        for algo in self.algorithms:
            # 알고리즘 이름을 기록합니다. 이후 클라이언트에게 어떤 알고리즘이 사용되었는지 알릴 수 있습니다.
            algorithm_name = algo.GetName()

            # 추천 모델을 훈련시킵니다.
            trainSet = self.dataset.GetFullTrainSet()
            algo.GetAlgorithm().fit(trainSet)

            # 사용자에 대한 추천을 계산합니다.
            testSet = self.dataset.GetAntiTestSetForUser(testSubject)
            predictions = algo.GetAlgorithm().test(testSet)

            recommendations = []

            # 예측된 평점을 바탕으로 추천을 정렬합니다.
            for userID, bookId, actualRating, estimatedRating, _ in predictions:
                intMovieID = int(bookId)
                recommendations.append((intMovieID, estimatedRating))

            recommendations.sort(key=lambda x: x[1], reverse=True)

            # 상위 k개의 추천 결과를 리스트에 추가합니다.
            top_recommendations = recommendations[:k]
            recommendations_list.append({
                "algorithm": algorithm_name,
                "recommendations": [{"bookId": bookId, "estimatedRating": rating} for bookId, rating in
                                    top_recommendations]
            })

        return recommendations_list


            
            
    
    
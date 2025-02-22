# Introduction

There are many third-party websites that provide information like ratings or scores of Leetcode problems, a feature that is not available on the official website. Over the past few years, the overall difficulty of Leetcode problems has been increasing, making the difficulty tags less effective in reflecting the actual challenge level of a problem. As a result, third-party websites play an important role in assisting with problem-solving.

These ratings are calculated from leetcode weekly/biweekly contests based on [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system) as well as [Maximum likelihood estimation](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation). Some of the data used in this project comes from the open-source dataset shared by [GitHub user zerotrac](https://github.com/zerotrac/leetcode_problem_rating/blob/main/ratings.txt).

Since retrieving the status of problems requires the user’s Leetcode token, otherwise, the status field in the Leetcode API response will be null, this project enables syncing problem statuses to help users train more efficiently.

I have developed a Chrome extension, which is currently under review. The extension get the Leetcode token from Chrome cookies, retrieves the problem data, and then sends it to this website.



See: [project link](https://lc-buddy.codingawsome.com/)



The features are limited, but the reason to do such a project is also test if the Chrome Extension way is available. If this Chrome extension is approved and published, other similar non-profit projects can also use it to fetch and synchronize user data without the need for persistent storage on a third-party backend.


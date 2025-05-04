import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/async_handler.js";
import DemarcationLog from "../models/demarcation.models.js";

export const getDemarcationLogs = asyncHandler(async (req, res) => {
    const { role, id: userId } = req.user;
    const { plot_id, page = 1, limit = 10 } = req.query;
  
    // 1️⃣ Build base filter
    const where = {};
    if (plot_id) {
      where.plot_id = Number(plot_id);
    }
  
    // 2️⃣ Scope for officer → only their own logs
    if (role === 'officer') {
      where.officer_id = userId;
    }
  
    // 3️⃣ Pagination math
    const pageNum = Math.max(1, Number(page));
    const perPage = Math.max(1, Number(limit));
    const offset  = (pageNum - 1) * perPage;
  
    // 4️⃣ Query with count & rows
    const { count, rows } = await DemarcationLog.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit: perPage,
      offset
    });
  
    // 5️⃣ Format response
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          logs: rows,
          pagination: {
            total: count,
            page: pageNum,
            limit: perPage,
            pages: Math.ceil(count / perPage)
          }
        },
        'Demarcation logs fetched'
      )
    );
});

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;

namespace Mvc3App.GridModels
{
    public class jqGridDataManager
    {
        // TODO: Move to more reasonable location.
        public static IQueryable<T> GetGridData<T>(
            JqGridSettings gridSettings,
            IQueryable<T> source,
            out int totalPages,
            out int totalRecords) where T : class
        {
            IQueryable<T> entities;

            if (gridSettings.IsSearch)
            {
                var parameters = new object[] { };
                var linq = gridSettings.Where.ToDynamicStatement(out parameters);
                if (string.IsNullOrWhiteSpace(linq))
                {
                    totalRecords = source.Count();
                    entities = source
                        .OrderBy(string.Format("{0} {1}", gridSettings.SortColumn, gridSettings.SortOrder))
                        .Skip((gridSettings.PageIndex - 1) * gridSettings.PageSize)
                        .Take(gridSettings.PageSize);
                }
                else
                {
                    var searchResult = source.Where(linq, parameters);
                    totalRecords = searchResult.Count();
                    entities = searchResult
                        .OrderBy(string.Format("{0} {1}", gridSettings.SortColumn, gridSettings.SortOrder))
                        .Skip((gridSettings.PageIndex - 1) * gridSettings.PageSize)
                        .Take(gridSettings.PageSize);
                }
            }
            else
            {
                totalRecords = source.Count();
                entities = source
                    .OrderBy(string.Format("{0} {1}", gridSettings.SortColumn, gridSettings.SortOrder))
                    .Skip((gridSettings.PageIndex - 1) * gridSettings.PageSize)
                    .Take(gridSettings.PageSize);
            }

            totalPages = (int)Math.Ceiling((float)totalRecords / (float)gridSettings.PageSize);

            return entities;
        }

    }

    //public class jqGridDataManager
    //{
    //    // TODO: Move to more reasonable location.
    //    public static List<T> GetGridData<T>(
    //        JqGridSettings gridSettings,
    //        IList<T> source,
    //        out int totalPages,
    //        out int totalRecords) where T : class
    //    {
    //        IList<T> entities;

    //        if (gridSettings.IsSearch)
    //        {
    //            var parameters = new object[] { };
    //            var linq = gridSettings.Where.ToDynamicStatement(out parameters);
    //            if (string.IsNullOrWhiteSpace(linq))
    //            {
    //                totalRecords = source.Count();
    //                entities = source
    //                    .OrderBy(string.Format("{0} {1}", gridSettings.SortColumn, gridSettings.SortOrder))
    //                    .Skip((gridSettings.PageIndex - 1) * gridSettings.PageSize)
    //                    .Take(gridSettings.PageSize);
    //            }
    //            else
    //            {
    //                var searchResult = source.Where(linq, parameters);
    //                totalRecords = searchResult.Count();
    //                entities = searchResult
    //                    .OrderBy(string.Format("{0} {1}", gridSettings.SortColumn, gridSettings.SortOrder))
    //                    .Skip((gridSettings.PageIndex - 1) * gridSettings.PageSize)
    //                    .Take(gridSettings.PageSize);
    //            }
    //        }
    //        else
    //        {
    //            totalRecords = source.Count();
    //            entities = source
    //                .OrderBy(string.Format("{0} {1}", gridSettings.SortColumn, gridSettings.SortOrder))
    //                .Skip((gridSettings.PageIndex - 1) * gridSettings.PageSize)
    //                .Take(gridSettings.PageSize);
    //        }

    //        totalPages = (int)Math.Ceiling((float)totalRecords / (float)gridSettings.PageSize);

    //        return entities;
    //    }

    //}

}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace JXGIS.Common.BaseLib
{
    /// <summary>
    /// 数据库查询上下文
    /// </summary>
    public class SQLComDbContext
    {
        private SqlDataAdapter _DBAdapter = null;
        private string _connectionString = null;
        private SqlConnection _connection = null;

        public SQLComDbContext()
        {
            this._connectionString = SystemUtils.Config.SQLDbConStr;
            this._DBAdapter = new SqlDataAdapter();
            this._connection = new SqlConnection(this._connectionString);
        }

        public SQLComDbContext(string sConnectionString)
        {
            this._connectionString = sConnectionString;
            this._DBAdapter = new SqlDataAdapter();
            this._connection = new SqlConnection(this._connectionString);
        }

        public DataTable ExecuteQuery(string selectSQL, params SqlParameter[] SqlParameters)
        {
            SqlCommand cmd = new SqlCommand(selectSQL, this._connection);
            cmd.Parameters.AddRange(SqlParameters);
            this._DBAdapter.SelectCommand = cmd;
            DataTable dt = new DataTable();
            this._DBAdapter.Fill(dt);
            return dt;
        }

        /// <summary>
        /// 获取分页的DataTable
        /// </summary>
        /// <param name="selectSQL"></param>
        /// <param name="startRecordNum">从第几条数据开始取 从1开始编号</param>
        /// <param name="recordCount">获取的行数</param>
        /// <returns></returns>
        public DataTable ExecuteQuery(string selectSQL, int startRecordNum, int recordCount, params SqlParameter[] SqlParameters)
        {
            SqlCommand cmd = new SqlCommand(selectSQL, this._connection);
            cmd.Parameters.AddRange(SqlParameters);
            this._DBAdapter.SelectCommand = cmd;
            DataTable dt = new DataTable();
            this._DBAdapter.Fill(startRecordNum - 1, recordCount, dt);
            return dt;
        }

        public static SQLComDbContext Context
        {
            get { return new SQLComDbContext(); }
        }
    }
}

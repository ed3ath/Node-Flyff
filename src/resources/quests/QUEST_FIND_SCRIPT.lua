QUEST_FIND_SCRIPT = {
	title = 'IDS_PROPQUEST_INC_000869',
	character = 'MaDa_Colar',
	end_character = 'MaSa_Troupemember1',
	start_requirements = {
		min_level = 37,
		max_level = 60,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_DISAPP_SCRIPT',
	},
	rewards = {
		gold = 0,
		exp = 692061,
		items = {
			{ id = 'II_GEN_POT_DRI_VITAL700', quantity = 10, sex = 'Any' },
			{ id = 'II_GEN_REF_REF_SEVENTH', quantity = 10, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_SCRIPT', quantity = 6, sex = 'Any', remove = true },
		},
	},
	drops = {
		{
			item_id = 'II_SYS_SYS_QUE_SCRIPT',
			probability = '200000000',
			monsters = {
				'MI_STEAMWALKER1',
				'MI_STEAMWALKER2',
				'MI_STEAMWALKER3'
			}
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000870',
			'IDS_PROPQUEST_INC_000871',
			'IDS_PROPQUEST_INC_000872',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000873',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000874',
		},
		completed = {
			'IDS_PROPQUEST_INC_000875',
			'IDS_PROPQUEST_INC_000876',
			'IDS_PROPQUEST_INC_000877',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000878',
		},
	}
}

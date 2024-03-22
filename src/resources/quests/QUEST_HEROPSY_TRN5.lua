QUEST_HEROPSY_TRN5 = {
	title = 'IDS_PROPQUEST_INC_001643',
	character = 'MaDa_Pereb',
	end_character = 'MaDa_Shyniff',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_HEROPSY_TRN4',
	},
	rewards = {
		gold = 0,
		exp = 0,
		job = 'JOB_PSYCHIKEEPER',
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_VENHEART', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_GUARDMON1', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_VENHEART', monster_id = 'MI_GUARDMON1', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001644',
			'IDS_PROPQUEST_INC_001645',
			'IDS_PROPQUEST_INC_001646',
			'IDS_PROPQUEST_INC_001647',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001648',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001649',
		},
		completed = {
			'IDS_PROPQUEST_INC_001650',
			'IDS_PROPQUEST_INC_001651',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001652',
		},
	}
}

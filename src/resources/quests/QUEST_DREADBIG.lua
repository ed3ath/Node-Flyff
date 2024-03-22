QUEST_DREADBIG = {
	title = 'IDS_PROPQUEST_INC_001208',
	character = 'MaFl_Gergantes',
	end_character = 'MaFl_Gergantes',
	start_requirements = {
		min_level = 20,
		max_level = 29,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_HRTTHYRED', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_BKDREAD1', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_MAPDREAD1', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_ORGANIGOR', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_BKDREAD1', monster_id = 'MI_ORGANIGOR', probability = '1000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001209',
			'IDS_PROPQUEST_INC_001210',
			'IDS_PROPQUEST_INC_001211',
			'IDS_PROPQUEST_INC_001212',
			'IDS_PROPQUEST_INC_001213',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001214',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001215',
		},
		completed = {
			'IDS_PROPQUEST_INC_001216',
			'IDS_PROPQUEST_INC_001217',
			'IDS_PROPQUEST_INC_001218',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001219',
		},
	}
}
